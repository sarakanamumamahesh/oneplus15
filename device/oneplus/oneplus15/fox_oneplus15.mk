#
# Copyright (C) 2026 The OrangeFox Recovery Project
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

# Inherit virtual device setup
$(call inherit-product, $(SRC_TARGET_DIR)/product/generic_ramdisk.mk)

# Inherit OrangeFox configurations
$(call inherit-product, vendor/recovery/config/fox.mk)

# Inherit local device tree configuration
$(call inherit-product, device/oneplus/oneplus15/device.mk)

PRODUCT_NAME := fox_oneplus15
PRODUCT_DEVICE := oneplus15
PRODUCT_BRAND := OnePlus
PRODUCT_MODEL := OnePlus 15
PRODUCT_MANUFACTURER := OnePlus

# OrangeFox Branding & Feature Flags
FOX_VERSION := R12.1
FOX_BUILD_TYPE := Official
OF_MAINTAINER := Antigravity

# Enable Magisk installation directly in OrangeFox
OF_USE_MAGISK_INPUT := true
OF_USE_NEW_MAGISK := true

# Disable splash logo customization override if missing
OF_NO_SPLASH_CHANGE := 1
