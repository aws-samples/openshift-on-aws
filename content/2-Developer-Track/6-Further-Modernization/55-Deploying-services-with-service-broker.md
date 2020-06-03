+++
title = "Deploying native Services with the AWS Service Broker"
chapter = false
weight = 4
+++


:imagesdir: /images

This module assumes that teh AWS Service Broker is installed and configured.
If you have not already completed this, please complete the installing the service broker module under the administator track:
https://openshift4-on-aws.awsworkshop.io/3-administrator-track/2-integrations/2-aws-service-broker/1_installing-the-aws-service-broker.html


## Using the OpenShift Serice Catolog to deploy AWS service via a graphical interface.

Step 1:: Connect to the OpenShift web console:
----
This is the same process covered in the getting started module
----

Step 2:: Create a project
----
Under the *developer* context
expland advanced on the left
expand projects
click on create project
create a project called *native*
----

Step 3:: Deploying an AWS S3 bucket using the Broker

The AWS Service broker makes use of prescritive infrastructure as code templates to provision AWS services. The AWS Service broker uses plans which are collections of parameters, with predefined defaults. These prescribed parameter defaults are intended to reduce the amount of infomation a developer would need to input in order to adopt and Service. These can however be over written when provisioning the service, or the defaults can be changed in the infrastructure as code templates. To take it a step further teams can create completely custom templates and a custom catalog of services.

----
Under the add menu select from catalog.
If the AWS service Broker is installed you should see services listed under the Service Class type.
Select Service Class on the left.
   This will filter the catalog to only show services Provided by the AWS Service Broker.
Scroll down  to find Amazon S3.
Click create service instance
Change the Service instance name to <YOUR STUDENT NUMBER S3>
Under plans select production
Click on create
----

The provisioning process is out of band. The oc create api call is passed to the AWS Service broker which in tern performs an API to the AWS CloudFormation service to launch a stack describing the AWS service. While this stack is building within the AWS account The Conditions page will reflect provisioning in progress. The broker will poll the state of the stack. Once the stack is complete the Conditions page will show The instance was provisioned successfully or some other dreadful undesired state. 

All the info needed to consume the AWS Service such as arn, endpoint, URL, usernames, passwords, are passed back to the broker and stored as a secret within OpenShift. This can be used later to bind to applications.

image::brokers3.gif[project]

Step 3:: Clean up
----
Expand advanced on the left
Select projects
Scroll down to find the native project
click in the 3 dot menu on the right
Select delete project
type in native
Click on delete
----

Deleting the project will remove all artifaces from OpenShift including the services provided by the AWS Service Broker. The broker will perform an API call to AWS CloudFormation to delete the stack, removing the AWS services provisioned out of band. To protect against data loss, certain resources will be retained. RDS will create a final snapshot of the database, S3 will retail the bucket in the account, this can be manually removed once data has been moved out of the bucket. These behaviors are defined within the templates and can be customized.

## Deploying services via the CLI

Step 1:: Connect to the OpenShift cluster using the cli
----
Connect to your Cloud 9 dev ui if you have not already done so.
Connect to the workshop student landing page:
https://lab2-ignitionbucket-137e1h7z6m6h0.s3-us-west-2.amazonaws.com/workshop.html [Student landing page]
Find and expand your student number
Follow the instructions to connect to your Cloud 9 developer IDE

./oc login api.apps.lab3-student0.egrsolutions.co.za:6443
provide the username and password for the 
https://lab2-ignitionbucket-137e1h7z6m6h0.s3-us-west-2.amazonaws.com/workshop.html
----

Step 2 Create project
----
oc new-project nativedb
----


Step 3:: Deploy RDS database using the AWS Service Broker
----
svcat provision mysql --class rdsmysql --plan custom  \
   -p PubliclyAccessible=true \
   -p DBName=vote \
   -p AccessCidr=0.0.0.0/0 \
   -p MasterUsername=pricelist \
   -p MasterUserPassword=pricelist \
   -p MultiAZ=false \
   -p DBInstanceClass=db.m4.large \
   -p AutoMinorVersionUpgrade=false \
   -p PortNumber=13306 \
   -p BackupRetentionPeriod=0 
----



