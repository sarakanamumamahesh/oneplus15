#
# Copyright (C) 2026 The OrangeFox Recovery Project
#

# Inherit virtual device setup
$(call inherit-product, $(SRC_TARGET_DIR)/product/generic_ramdisk.mk)

# Inherit OrangeFox / TWRP configurations safely
$(call inherit-product-if-exists, vendor/recovery/config/fox.mk)
$(call inherit-product-if-exists, vendor/twrp/config/common.mk)
$(call inherit-product-if-exists, vendor/omni/config/common.mk)

# Inherit local device tree configuration
$(call inherit-product, device/oneplus/oneplus15/device.mk)

PRODUCT_NAME := fox_oneplus15
PRODUCT_DEVICE := oneplus15
PRODUCT_BRAND := OnePlus
PRODUCT_MODEL := OnePlus 15 (IN)
PRODUCT_MANUFACTURER := OnePlus

# Indian Variant (CPH / IN Region) Specifics
PRODUCT_BUILD_PROP_OVERRIDES += \
    TARGET_DEVICE="oneplus15" \
    PRODUCT_NAME="oneplus15_in" \
    PRIVATE_BUILD_DESC="oneplus15_in-user 15 OOP1.240901.001 A.01 release-keys"

# OrangeFox Branding & Maintainer
FOX_VERSION := R12.1
FOX_BUILD_TYPE := Official
OF_MAINTAINER := Antigravity

# OrangeFox Feature Flags
OF_USE_AIDL_BOOT_CONTROL := 1
OF_FORCE_DATA_FORMAT_F2FS := 1
OF_UNBIND_SDCARD_F2FS := 1
OF_WIPE_METADATA_AFTER_DATAFORMAT := 1
OF_DYNAMIC_FULL_SIZE := 18907922432
OF_NO_TREBLE_COMPATIBILITY_CHECK := 1
OF_USE_LZ4_COMPRESSION := 1
OF_ENABLE_FS_COMPRESSION := 1
OF_ENABLE_ALL_PARTITION_TOOLS := 1
OF_WORKAROUND_BACKUP_BUG := 1

# Magisk & Root Support
OF_USE_MAGISK_INPUT := true
OF_USE_NEW_MAGISK := true
OF_NO_SPLASH_CHANGE := 1
