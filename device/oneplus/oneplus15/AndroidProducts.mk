#
# Copyright (C) 2026 Universal Custom Recovery Project (OrangeFox / TWRP / SHRP / PBRP)
#

PRODUCT_MAKEFILES := \
    $(LOCAL_DIR)/fox_oneplus15.mk \
    $(LOCAL_DIR)/twrp_oneplus15.mk \
    $(LOCAL_DIR)/shrp_oneplus15.mk \
    $(LOCAL_DIR)/pbrp_oneplus15.mk

COMMON_LUNCH_CHOICES := \
    fox_oneplus15-userdebug \
    twrp_oneplus15-userdebug \
    shrp_oneplus15-userdebug \
    pbrp_oneplus15-userdebug
