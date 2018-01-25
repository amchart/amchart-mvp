#! /usr/bin/env bash

## A docker-compose wrapper script for overlaying conf files by env.

display_usage() {
  echo -e $"\nUsage: $0 {dev|prod} {Compose command}
    \n⇨ Example: $0 dev up
    \n⇨ Hint: add sawtooth-override.yaml for per-machine conf"
}

if [ "$#" -lt 2 ]; then
  display_usage
  exit 0
fi

cd HyperledgerFramework

compose_files="-f sawtooth-default.yaml -f sawtooth-$1.yaml"

# append user overrides if present.
if [ -f sawtooth-override.yaml ]; then
  compose_files=$compose_files" -f sawtooth-override.yaml"
fi
echo -e "⇨ Using conf flags: $compose_files\n"

set -x

docker-compose $compose_files "${@:2}"
