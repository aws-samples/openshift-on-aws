+++
title = "Automation"
chapter = true
weight = 3
+++

# Automation through CICD

{{% children showhidden="false" %}}


Agility is a significant driver for modernization. It is important to note that agility can be agained in different ways and indifferent layers of the business. Though OpenShift itself caters for several abstractions to speed up the developer process automation is still critical to achieve agility within the administrative and security spaces.

Anything that can be automated should!

In this section we will explore a Git Ops process of deploying an application within OpenShift using Source to Image. Then using Git webhooks to detect changes developers are making within their source code repos to trigger updates of the running applications within OpenShift.

If you have already completed the second part of the deploying applications lab *Running faster with Source to image* then you can reuse the artifacts from that lab. Should you not have done that lab, you will need to complete all the parts of this lab.