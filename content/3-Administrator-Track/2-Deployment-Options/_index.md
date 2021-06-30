+++
title = "Deployment Options"
chapter = true
weight = 2
+++

# OpenShift Deployment Options

{{% children showhidden="false" %}}



Customers have a few options for consuming OpenShift on AWS. In this module we will explore the different OpenShift OpenShift as well as ways of deploying these.

OpenShift is available in self managed where the customer will install , configure and manage the OpenShift clusters themselves, and managed versions where the install and config are largely automated and Red Hat SRE teams manage the OpenShift clusters of behalf of the customer.


![OpenShift on AWS](/images/openshiftoptions.png)

### OpenShift Container Platform OCP
OpenShift Container Platform OCP is self managed by the customer and provides  granular control and a high degree of customization. Customers who desire the a high degree of control themselves, who have strong in house skills and capability or who have a need to for configurations specific to their business needs may find OCP a good fit. 

### Managed OpenShift:
Over the past few years there is a noted shift towards managed services. AWS customers have been able to take advantage of managed AWS services where AWS takes care of the undifferenciated heavy lifting. Customers desire this for other platforms as well. 

There are a few drivers of this shift to managed. There are customers who lack resoures and technical skills and would prefer to have OpenShift managed on their behalf. More commonly customers have the resources and skill, however they would prefer to focus those resources on activities which a more aligned with the goals of the business and help deliver new solutions to customers, instead of focusing on operational tasks. making use of a managed service where someone else managed the clusters for your business frees up resources for other functions.

OpenShift managed Options are managed on behalf of the customer by Red Hat SRE teams 24/7.
This monitor clusters, scale as needed , take required actions for any break fix issues.
Manage patching and updates.


At this stage there are two managed OpenShift Options available on AWS:

### OpenShift Dedicated:

Highlights:

- Fully managed version of OpenShift
- It is still OpenShift, it is the same code base as developer experience.
- Sold by red Hat, Customers can purchase OpenShift Dedicated via their Red Hat account rep.
- Installed configured and managed by Red Hat SRE
- Two options:
	1. **OpenShift Dedicated Std edition.**

	Std edition the OpenShift cluster is deployed into an AWS account owned by Red Hat. The customer has no visibility or control over the AWS account. 

	This option does provide unified billing as Red Hat will provide a bill to the customer for all the OpenShift subscrition costs as well as AWS resource costs within a single Red Hat bill. 

	2. **OpenShift Dedicated cloud choice.**

	In this case the cluster is deployed into an AWS account owned by the customer. The customer has control and visibility into the AWS account. Red Hat SRE will have IAM access to the AWS account in order to deploy and manage the OpenShift cluster. 

	This option does not provide unified billing, customers will get a bill from Red Hat for OpenShift subscrition costs and a separate bill from AWS for the related AWS resources.


https://pages.awscloud.com/apn-tv-other-ep-034.html?trk=tv_card&did=tv_card [Watch this short video on OpenShift dedicated]



### Red Hat OpenShift Service on AWS ROSA:

AWS and Red Hat collected customer feedback and the Red Hat OpenShift Service on AWS is the response to that feedback.

This is what customers asked for:
1. Unifield billing on AWS
2. Consumption based billing (pay as you use) as they get with other AWS services.
3. Ability to procure directly from the AWS console like other AWS services instead of having to interact with multiple account teams.
4. Faster deployment process similar to other AWS services instead of having to wait for SRE deployment.

- Customers are a bill from AWS which contains all the related AWS resource costs and a separate line item for the OpenShift subscritions.
- ROSA has on demand consumption based hourly billing. Should the customer scale down or terminate the OpenShift cluster they will only pay for the hours used, this applies to the AWS resources as well as the OpenShift subscritions.
- Customers can go directly to the AWS ROSA console, enable the service and launch a cluster.  


https://pages.awscloud.com/apn-tv-aws-re-invent-ep-040 [Watch this short video on Red Hat OpenShift Service on AWS]



You can get your hands dirty by running through the ROSA track
https://openshift4-on-aws.awsworkshop.io/4-rosa-track.html






