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

LOCAL_PATH := device/oneplus/oneplus15

# Enable Virtual A/B
$(call inherit-product, $(SRC_TARGET_DIR)/product/virtual_ab_ota.mk)

# Dynamic Partitions
PRODUCT_BUILD_SUPER_PARTITION := false
PRODUCT_USE_DYNAMIC_PARTITIONS := true

# Shipping API level & VNDK Version
BOARD_SHIPPING_API_LEVEL := 34
PRODUCT_SHIPPING_API_LEVEL := 34
PRODUCT_TARGET_VNDK_VERSION := 34
BOARD_SYSTEMSDK_VERSIONS := 31 32 33 34 35

# Dynamic Partition Tools
PRODUCT_PACKAGES += \
    lpflash \
    lpmake \
    lpunpack

# Soong Namespaces
PRODUCT_SOONG_NAMESPACES += $(LOCAL_PATH)
