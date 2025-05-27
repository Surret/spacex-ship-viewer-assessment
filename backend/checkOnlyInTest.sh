#!/bin/bash
if [[ $(find ./ -name "*.test.*" -exec grep -H '\.only' {} +) ]]; then
    echo some test files are using .only
    $(find ./ -name "*.test.*" -exec grep -H '\.only' {} +)
    exit 1;
fi;