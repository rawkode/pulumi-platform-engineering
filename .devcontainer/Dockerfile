ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT} AS base

RUN curl -fsSL https://get.pulumi.com/ | bash -s -- --version $PULUMI_VERSION

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}
RUN curl -fsSL https://civo.com/get | sh

COPY --from=base /root/.pulumi/bin/pulumi /usr/local/bin/
COPY --from=base /root/.pulumi/bin/*-nodejs* /usr/local/bin/
COPY --from=base /root/.pulumi/bin/pulumi-analyzer-policy /usr/local/bin/
