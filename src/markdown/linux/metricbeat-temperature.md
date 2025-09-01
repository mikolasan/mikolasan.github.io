---
title: "Metricbeat: temperature"
date: 2023-04-03
published: 2023-04-03
lastModified: 2023-04-03
subtitle: Making your own beat
---



Although there is a plugin that possibly can fulfill our demand - [lmsensorsbeat](https://github.com/eskibars/lmsensorsbeat) - but I would not stop there.

So if you want to over-engineer [this approach](/linux/read-temperature-without-extra-tools), then keep reading.

## Making your own beat

We will be developing this thing in Go

```bash
apt install golang golang-glide
```

Then start following [the official tutorial from Elastic](https://www.elastic.co/guide/en/beats/devguide/current/beats-contributing.html). I know, it's really written like they don't want you to develop your own plugins, they want you to pray for existence of in the marketplace.


```bash
cd metricbeat
make create-metricset MODULE=lmsensors METRICSET=lmsensors
# mage createMetricset
# Module name: lmsensorsbeat
# Metricset name: sensors
```

Edit **module/lmsensors/lmsensors.go**

```go
package lmsensors

import (
	"sync"

	"github.com/elastic/beats/v7/metricbeat/internal/sysinit"
	"github.com/elastic/beats/v7/metricbeat/mb"
)

func init() {
	// Register the ModuleFactory function for this module.
	if err := mb.Registry.AddModule(ModuleName, NewModule); err != nil {
		panic(err)
	}
}

func NewModule(base mb.BaseModule) (mb.Module, error) {
	var config Config
	if err := base.UnpackConfig(&config); err != nil {
		return nil, err
	}
	return &base, nil
}

// ModuleName is the name of this module.
const ModuleName = "lmsensors"
```


```bash
mkdir -p ../x-pack/lmsensors/module  
make update BEAT_NAME=lmsensors NO_COLLECT=true
```

Add external dependencies ([gosensors](https://github.com/eosswedenorg-go/gosensors)) to the beats project  

```bash
go get github.com/eskibars/gosensors
```

Run it as

```bash
./metricbeat  
-c metricbeat.yml  
--path.home .  
--path.config .  
--path.data .  
--path.logs .
```

[https://github.com/util-linux/util-linux/blob/d155c11d2e5374623d16c6bae7198ec9b8f479bb/sys-utils/lscpu-cputype.c](https://github.com/util-linux/util-linux/blob/d155c11d2e5374623d16c6bae7198ec9b8f479bb/sys-utils/lscpu-cputype.c)

### Another examples

- [nvidiagpubeat](https://github.com/eBay/nvidiagpubeat)
- [Makefile](https://github.com/awormuth/amazonbeat/blob/master/Makefile)
- [Makefile](https://github.com/live-wire/terminalbeat/blob/master/Makefile)

### Elastic Forum Threads

- [CPU temperatur](https://discuss.elastic.co/t/cpu-temp-and-deployment-status/206659)
- [How to monitor CPU temperature?](https://discuss.elastic.co/t/how-to-monitor-cpu-and-other-device-temps/196679)
- [Raspberry Pi 4 CPU temperature monitoring](https://discuss.elastic.co/t/raspberry-pi-4s-cpu-temperature-monitoring/227874)

### Open Issues on Elastic Beats

- [Enhancement: expanded CPU monitoring](https://github.com/elastic/beats/issues/11848)
