#
# Copyright (C) 2026 PitchBlack Recovery Project (PBRP)
#

# Configure base.mk & 64-bit only
$(call inherit-product, $(SRC_TARGET_DIR)/product/base.mk)
$(call inherit-product, $(SRC_TARGET_DIR)/product/core_64_bit_only.mk)

# Configure Virtual A/B Compression
$(call inherit-product, $(SRC_TARGET_DIR)/product/virtual_ab_ota/compression.mk)

# Inherit PBRP common configs safely
$(call inherit-product-if-exists, vendor/pbrp/config/common.mk)
$(call inherit-product-if-exists, vendor/pb/config/common.mk)
$(call inherit-product-if-exists, vendor/twrp/config/common.mk)

# Inherit local device tree configuration
$(call inherit-product, device/oneplus/oneplus15/device.mk)

PRODUCT_NAME := pbrp_oneplus15
PRODUCT_DEVICE := oneplus15
PRODUCT_BRAND := OnePlus
PRODUCT_MODEL := OnePlus 15 (IN)
PRODUCT_MANUFACTURER := OnePlus

# PBRP Specific Flags
PBRP_MAINTAINER := Antigravity
PB_TARGET_VENDOR_READONLY := true

PRODUCT_BUILD_PROP_OVERRIDES += \
    TARGET_DEVICE="oneplus15" \
    PRODUCT_NAME="oneplus15_in" \
    PRIVATE_BUILD_DESC="oneplus15_in-user 15 OOP1.240901.001 A.01 release-keys"
