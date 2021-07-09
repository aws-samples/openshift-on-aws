+++
title = "OpenShift on AWS Storage options"
chapter = true
weight = 30
+++

# OpenShift on AWS Storage Options


AWS provides a braod variety of storage options for customers to use in the solution stacks. Each of these storage options caters for different use cases and provides different options for resilience, scale and recover.

The following AWS white paper discusses the various AWS storage options as well as related considerations. 
https://docs.aws.amazon.com/whitepapers/latest/aws-storage-services-overview/aws-storage-services-overview.pdf

This is a recommended read not only for container solutions but also for any workload which as a storage requirement on AWS.

## Ephemeral storage:

AWS EC2 instances which form the compute layer under pinning OpenShift on AWS have directly attached physical disk storage. 
This is low cost, high performance storage which comes as part of the EC2 instance selection. i.e when you select an AWS instance type as an OpenShift worker node it will come with some ephemeral or instance store storage. 

OpenShift can make use of ephemeral storage. 

However it should be noted that ephemeral storage is linked to a specific node, if the container or pod changes state or is moved to an other node that data is lost, if the Ec2 instance is stopped, or replaced that storage is lost. It is Volatile storage. As such careful consideration should be made when deciding to make use of ephemeral storage.

These considerations are discusses from page 22 of the above white paper.

The following documentation discusses emphemeral storage within OpenShift
https://docs.openshift.com/container-platform/4.7/storage/understanding-ephemeral-storage.html


## persistant storage

More commonly customers make use of peristant storage. 
Storage is provisioned and presented to the OpenShift cluster, on AWS this is commonly EBS volumes attached to EC2 instances. OpenShift then allows for Kubernettes persistant volume claims to allow pods to claim portions of the provisioned storage. 

It should be noted that AWS EBS storage can be provisioned from the AWS console and attached to OpenShift worker nodes, or EBS volumes can be provisioned from within the OpenShift web console. 

OpenShift 4 controls AWS EBS via an AWS EBS CSI:
https://docs.openshift.com/container-platform/4.7/storage/container_storage_interface/persistent-storage-csi-ebs.html#persistent-storage-csi-ebs


## Shared Storage 

Shared storage is provisioned and presented to multiple OpenShift nodes, which allows for scale and resilience benefits.
Common options include AWS EFS and AWS S3, OpenShift 3 could implement glusterFS, but OpenShift 4 it is more common to see ceph.
Ceph implementations will see EBS volumes attached to OpenShift strorage nodes, this storage is then aggregated and presented to OpenShift worker nodes. 

## Food for thought... if you don't have to .... Don't!

Feedback from successful customers is that running OpenShift on AWS allows for reduction of persistent storage management.
Making use of AWS native services such as AWS Relational database service (RDS), Amazon elsticache, Amazon S3, Amazon Dynamodb can replace application stack layers running within OpenShift. This means that customers no longer need to manage the related persistant storage for these layers. The native AWS services in many cases provide storage expantion and scaling as needed. 




{{% children showhidden="false" %}}