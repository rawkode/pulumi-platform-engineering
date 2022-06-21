import * as pulumi from "@pulumi/pulumi";
import * as civo from "@pulumi/civo";
import * as kubernetes from "@pulumi/kubernetes";
import { PulumiOperator } from "./operator";

const network = new civo.Network("workshop", {
  label: "workshop",
});

const firewall = new civo.Firewall("workshop", {
  networkId: network.id,
});

const kubernetesCluster = new civo.KubernetesCluster("workshop", {
  networkId: network.id,
  firewallId: firewall.id,
  pools: {
    size: "g4s.kube.medium",
    nodeCount: 3,
  },
});

export const kubeconfig = kubernetesCluster.kubeconfig;

const operator = new PulumiOperator("workshop", {
  provider: new kubernetes.Provider("civo", {
    kubeconfig: kubernetesCluster.kubeconfig,
  }),
});

const myProject = operator.addRepository(
  "nginx",
  "https://github.com/pulumi/workshops",
  "/cicd-with-gha-and-pulumi-operator/gitops"
);
