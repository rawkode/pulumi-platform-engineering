import * as pulumi from "@pulumi/pulumi";
import * as civo from "@pulumi/civo";

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
