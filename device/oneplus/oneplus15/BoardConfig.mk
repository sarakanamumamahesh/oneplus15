#
# Copyright (C) 2026 The OrangeFox / TWRP Recovery Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the Apache License, Version 2.0 retreats on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

DEVICE_PATH := device/oneplus/oneplus15

# For building with minimal manifest
ALLOW_MISSING_DEPENDENCIES := true
BUILD_BROKEN_DUP_RULES := true
BUILD_BROKEN_ELF_PREBUILT_PRODUCT_COPY_FILES := true
BUILD_BROKEN_PLUGIN_VALIDATION := soong-libaosprecovery_defaults soong-libguitwrp_defaults soong-libminuitwrp_defaults soong-vold_defaults

# Architecture (Pure 64-Bit Snapdragon 8 Elite)
TARGET_ARCH := arm64
TARGET_ARCH_VARIANT := armv8-a
TARGET_CPU_ABI := arm64-v8a
TARGET_CPU_ABI2 :=
TARGET_CPU_VARIANT := generic
TARGET_CPU_VARIANT_RUNTIME := oryon

TARGET_2ND_ARCH := arm
TARGET_2ND_ARCH_VARIANT := armv7-a-neon
TARGET_2ND_CPU_ABI := armeabi-v7a
TARGET_2ND_CPU_ABI2 := armeabi
TARGET_2ND_CPU_VARIANT := generic
TARGET_2ND_CPU_VARIANT_RUNTIME := generic

# 64-Bit App Support
TARGET_SUPPORTS_64_BIT_APPS := true
BOARD_SYSTEMSDK_VERSIONS := 31 32 33 34

# Bootloader / Platform
TARGET_BOOTLOADER_BOARD_NAME := oneplus15
TARGET_BOARD_PLATFORM := sm8850
PRODUCT_PLATFORM := canoe
TARGET_BOARD_PLATFORM_GPU := qcom-adreno840

# Kernel & Boot Header (v4 - Android 15 GKI)
BOARD_BOOT_HEADER_VERSION := 4
BOARD_MKBOOTIMG_ARGS += --header_version $(BOARD_BOOT_HEADER_VERSION)
BOARD_PAGE_SIZE := 4096
BOARD_KERNEL_BASE := 0x00000000
BOARD_KERNEL_PAGESIZE := 4096
BOARD_KERNEL_IMAGE_NAME := Image
BOARD_RAMDISK_USE_LZ4 := true

# Recovery in Vendor Boot (Android 12+ GKI standard)
BOARD_MOVE_RECOVERY_RESOURCES_TO_VENDOR_BOOT := true
BOARD_USES_GENERIC_KERNEL_IMAGE := true
BOARD_INCLUDE_RECOVERY_RAMDISK_IN_VENDOR_BOOT := true
BOARD_EXCLUDE_KERNEL_FROM_RECOVERY_IMAGE := true

# A/B Partitions & OnePlus Custom Partitions
AB_OTA_UPDATER := true
AB_OTA_PARTITIONS := \
    boot \
    init_boot \
    vendor_boot \
    dtbo \
    odm \
    product \
    system \
    system_ext \
    system_dlkm \
    vbmeta \
    vbmeta_system \
    vbmeta_vendor \
    vendor \
    vendor_dlkm \
    my_bigball \
    my_carrier \
    my_company \
    my_engineering \
    my_heytap \
    my_manifest \
    my_preload \
    my_product \
    my_region \
    my_stock

# Dynamic Partitions
BOARD_SUPER_PARTITION_SIZE := 18907922432
BOARD_SUPER_PARTITION_GROUPS := qti_dynamic_partitions
BOARD_QTI_DYNAMIC_PARTITIONS_SIZE := 18903728128
BOARD_QTI_DYNAMIC_PARTITIONS_PARTITION_LIST := \
    system system_ext product vendor vendor_dlkm odm \
    my_bigball my_carrier my_company my_engineering my_heytap my_manifest my_preload my_product my_region my_stock

BOARD_PARTITION_LIST := $(call to-upper, $(BOARD_QTI_DYNAMIC_PARTITIONS_PARTITION_LIST))
$(foreach p, $(BOARD_PARTITION_LIST), $(eval BOARD_$(p)IMAGE_FILE_SYSTEM_TYPE := erofs))
$(foreach p, $(BOARD_PARTITION_LIST), $(eval TARGET_COPY_OUT_$(p) := $(call to-lower, $(p))))
BOARD_PROPERTY_OVERRIDES_SPLIT_ENABLED := true
BOARD_AVB_ENABLE := true

# File Systems
BOARD_HAS_LARGE_FILESYSTEM := true
TARGET_USERIMAGES_USE_EXT4 := true
TARGET_USERIMAGES_USE_F2FS := true
BOARD_USERDATAIMAGE_FILE_SYSTEM_TYPE := f2fs

# Storage / Mount Rules
TARGET_RECOVERY_FSTAB := $(DEVICE_PATH)/recovery.fstab

# Encryption & FBE v2
TW_INCLUDE_CRYPTO := true
TW_INCLUDE_CRYPTO_FBE := true
TW_INCLUDE_FBE_METADATA_DECRYPT := true
TW_USE_FSCRYPT_POLICY := 2
BOARD_USES_QCOM_FSCRYPT_V2 := true
PLATFORM_SECURITY_PATCH := 2026-09-01
PLATFORM_VERSION := 15
PLATFORM_VERSION_LAST_STABLE := $(PLATFORM_VERSION)

# OrangeFox Build Settings
FOX_BUILD_TYPE := Stable
FOX_VERSION := R12.1
OF_MAINTAINER := Antigravity
OF_KEEP_FORCED_ENCRYPTION := 1
OF_ALLOW_DISABLE_NAVBAR := 0

# Screen & Display Config
TW_THEME := portrait_hd
RECOVERY_GRAPHICS_USE_HEADER_2 := true
TARGET_SCREEN_WIDTH := 1260
TARGET_SCREEN_HEIGHT := 2800
OF_SCREEN_H := 2800
OF_STATUS_H := 100
OF_STATUS_INDENT_LEFT := 48
OF_STATUS_INDENT_RIGHT := 48
OF_CLOCK_POS := 1

# Features & Utilities
TW_EXTRA_LANGUAGES := true
TW_INCLUDE_NTFS_3G := true
TW_USE_NEW_MINADBD := true
TW_INPUT_BLACKLIST := "hbtp_vm"
TW_EXCLUDE_DEFAULT_USB_INIT := true
OF_USE_MAGISK_INPUT := true
OF_USE_NEW_MAGISK := true
OF_USE_HEX_FONT_FORMAT := true

# Touchscreen Vendor Modules
TW_LOAD_VENDOR_MODULES := "oplus_bsp_synaptics_tcm2.ko oplus_bsp_tp_common.ko oplus_bsp_tp_custom.ko oplus_bsp_tp_focal_common.ko oplus_bsp_tp_goodix_comnon.ko"
