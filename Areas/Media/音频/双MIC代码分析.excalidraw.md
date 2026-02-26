---
excalidraw-plugin: parsed
tags: [excalidraw]
---
# Text Elements
 int devm_snd_soc_register_component(struct device *dev,
               const struct snd_soc_component_driver *cmpnt_drv,
               struct snd_soc_dai_driver *dai_drv, int num_dai)
  {
      const struct snd_soc_component_driver **ptr;
      int ret;

      ptr = devres_alloc(devm_component_release, sizeof(*ptr), GFP_KERNEL);
      if (!ptr)
          return -ENOMEM;

      ret = snd_soc_register_component(dev, cmpnt_drv, dai_drv, num_dai);
      if (ret == 0) {
          *ptr = cmpnt_drv;
          devres_add(dev, ptr);
      } else {
          devres_free(ptr);
      }

      return ret;
  } ^BCIKn3Uf

     ret = devm_snd_soc_register_component(&i2c->dev,
                            &soc_codec_dev_es8323,                                                                                                                       ┆
                            &es8323_dai, 1); ^VhB2N1a5

  int devm_snd_soc_register_component(struct device *dev,
               const struct snd_soc_component_driver *cmpnt_drv,
               struct snd_soc_dai_driver *dai_drv, int num_dai)
  {
      const struct snd_soc_component_driver **ptr;
      int ret;

      ptr = devres_alloc(devm_component_release, sizeof(*ptr), GFP_KERNEL);
      if (!ptr)
          return -ENOMEM;

      ret = snd_soc_register_component(dev, cmpnt_drv, dai_drv, num_dai);
      if (ret == 0) {
          *ptr = cmpnt_drv;
          devres_add(dev, ptr);
      } else {
          devres_free(ptr);
      }

      return ret;
 ^Qka8Yxwm

 int snd_soc_register_component(struct device *dev,
              const struct snd_soc_component_driver *component_driver,
              struct snd_soc_dai_driver *dai_drv,
              int num_dai)
  {
      struct snd_soc_component *component;
      int ret;

      component = devm_kzalloc(dev, sizeof(*component), GFP_KERNEL);
      if (!component)
          return -ENOMEM;

      ret = snd_soc_component_initialize(component, component_driver, dev);
      if (ret < 0)
          return ret;

      return snd_soc_add_component(component, dai_drv, num_dai);
  }
  EXPORT_SYMBOL_GPL(snd_soc_register_component); ^rH5Z7ZEt

ES8388 驱动 ^GY5RUqv6

  int snd_soc_component_initialize(struct snd_soc_component *component,
                   const struct snd_soc_component_driver *driver,
                   struct device *dev)
  {
      INIT_LIST_HEAD(&component->dai_list);
      INIT_LIST_HEAD(&component->dobj_list);
      INIT_LIST_HEAD(&component->card_list);
      INIT_LIST_HEAD(&component->list);
      mutex_init(&component->io_mutex);

      component->name = fmt_single_name(dev, &component->id);
      if (!component->name) {
          dev_err(dev, "ASoC: Failed to allocate name\n");
          return -ENOMEM;
      }

      component->dev      = dev;
      component->driver   = driver;

      return 0;
  } ^jgu1Taj0

%%
# Drawing
```compressed-json
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
```
%%