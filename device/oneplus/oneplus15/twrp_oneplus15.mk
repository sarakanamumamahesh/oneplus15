#
# Copyright (C) 2026 TWRP & OrangeFox Recovery Project
#

# Inherit virtual device setup
$(call inherit-product, $(SRC_TARGET_DIR)/product/generic_ramdisk.mk)

# Inherit TWRP common configs if present
$(call inherit-product-if-exists, vendor/twrp/config/common.mk)
$(call inherit-product-if-exists, vendor/omni/config/common.mk)
$(call inherit-product-if-exists, vendor/recovery/config/fox.mk)

# Inherit local device tree configuration
$(call inherit-product, device/oneplus/oneplus15/device.mk)

PRODUCT_NAME := twrp_oneplus15
PRODUCT_DEVICE := oneplus15
PRODUCT_BRAND := OnePlus
PRODUCT_MODEL := OnePlus 15 (IN)
PRODUCT_MANUFACTURER := OnePlus

PRODUCT_BUILD_PROP_OVERRIDES += \
    TARGET_DEVICE="oneplus15" \
    PRODUCT_NAME="oneplus15_in" \
    PRIVATE_BUILD_DESC="oneplus15_in-user 15 OOP1.240901.001 A.01 release-keys"
