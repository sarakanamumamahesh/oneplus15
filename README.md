# Universal Custom Recovery Device Tree for OnePlus 15 (Android 15 / Snapdragon 8 Elite)

[![Build Universal Recovery](https://github.com/sarakanamumamahesh/oneplus15/actions/workflows/build_recovery.yml/badge.svg)](https://github.com/sarakanamumamahesh/oneplus15/actions/workflows/build_recovery.yml)
[![Recovery Support](https://img.shields.io/badge/Recovery-OrangeFox%20%7C%20TWRP%20%7C%20SHRP%20%7C%20PBRP-orange)](#-supported-recovery-frameworks)
[![Android Version](https://img.shields.io/badge/Android-15%20(GKI%206.6+)-green)](#-architecture--specifications)
[![Architecture](https://img.shields.io/badge/Architecture-ARM64--v8a%20(Pure%2064--bit)-blue)](#-architecture--specifications)

This repository contains the official production-grade custom recovery device tree and automated build pipelines for the **OnePlus 15** (Codename: `oneplus15`). 

It provides unified support for building **OrangeFox 14.1**, **TWRP 14.1**, **SkyHawk Recovery Project (SHRP)**, and **PitchBlack Recovery Project (PBRP)**.

---

## 📐 Architecture & Specifications

| Attribute | Specification |
| :--- | :--- |
| **Target Device** | OnePlus 15 (IN / Global / CN Variants) |
| **Device Codename** | `oneplus15` |
| **Model Aliases** | `CPH2745`, `CPH2747`, `CPH2749`, `PLK110`, `OP611FL1`, `OP60FFL1` |
| **SoC Platform** | Qualcomm Snapdragon 8 Elite (`SM8850` / `pineapple` / `canoe`) |
| **Architecture** | `arm64-v8a` (Pure 64-Bit Architecture) |
| **Android Base** | Android 15 (GKI Kernel 6.6+) |
| **Boot Header** | Version 4 (`vendor_boot.img` ramdisk integration) |
| **Partition Scheme** | Virtual A/B with Dynamic Partitions (`super`) |
| **Sub-Partitions** | `system`, `vendor`, `product`, `odm`, `system_ext`, `vendor_dlkm`, `my_product`, `my_region`, `my_stock` |
| **Filesystem Types** | EROFS (Super partitions), F2FS (`/data` with FBE v2 Encryption) |

---

## 🦊 Supported Recovery Frameworks

This device tree is engineered with a modular multi-recovery build system:

1. 🦊 **OrangeFox Recovery Project** (Branch `14.1` / Sync Git R12.1 base)
2. 🌊 **TeamWin Recovery Project (TWRP)** (Branch `twrp-14.1` minimal manifest)
3. 🦅 **SkyHawk Recovery Project (SHRP)** (Branch `shrp-12.1`)
4. 🖤 **PitchBlack Recovery Project (PBRP)** (Branch `android-12.1`)

---

## 📁 Repository Directory Structure

```text
.
├── .github/
│   └── workflows/
│       └── build_recovery.yml          # GitHub Actions CI/CD Multi-Recovery Workflow
├── device/
│   └── oneplus/
│       └── oneplus15/                  # OnePlus 15 Recovery Device Tree
│           ├── Android.bp              # Soong namespace configuration
│           ├── Android.mk              # Subdirectory makefile rules
│           ├── AndroidProducts.mk      # Multi-recovery lunch targets & product makefiles
│           ├── BoardConfig.mk          # Hardware, partitions, GKI v4 & build system rules
│           ├── device.mk               # Virtual A/B, VNDK & System SDK declarations
│           ├── system.prop             # Gatekeeper, FUSE passthrough & charger properties
│           ├── vendorsetup.sh          # Model aliases, KernelSU & OrangeFox build flags
│           ├── recovery.fstab          # Dynamic & physical partition mount points
│           ├── twrp.flags              # TWRP / OrangeFox partition GUI options
│           ├── fox_oneplus15.mk        # OrangeFox R12.1 product makefile & branding
│           ├── twrp_oneplus15.mk       # TWRP 14.1 product makefile
│           ├── shrp_oneplus15.mk       # SHRP product makefile
│           └── pbrp_oneplus15.mk       # PBRP product makefile
└── README.md                           # Documentation & Build Guide
```

---

## 🤖 Automated CI/CD Building (GitHub Actions)

The simplest way to compile your custom recovery binary is using our pre-configured GitHub Actions pipeline:

1. Navigate to the repository **[Actions](../../actions/workflows/build_recovery.yml)** tab.
2. Select **Universal Android Recovery Builder (TWRP / OrangeFox / SHRP / PBRP)**.
3. Click **Run workflow**.
4. Configure your desired options:
   - **Recovery Framework**: Choose `OrangeFox`, `TWRP`, `SHRP`, or `PBRP`.
   - **Makefile Prefix**: Select `fox` for OrangeFox, `twrp` for TWRP, `shrp` for SHRP, or `pbrp` for PBRP.
   - **Target Image**: Select `vendor_bootimage` (Recommended for Android 15 GKI v4) or `bootimage`.
5. Click **Run workflow** to initiate compilation.
6. Once completed, download the release artifact zip directly from the GitHub Releases page or Actions Artifacts.

---

## 🛠️ Local Building Instructions

### Step 1: Install Host Build Dependencies (Ubuntu 22.04 LTS / 24.04 LTS)

```bash
sudo apt-get update
sudo apt-get install -y \
  bc bison build-essential ccache curl flex g++-multilib \
  gcc-multilib git git-lfs gnupg gperf lib32ncurses5-dev lib32z1-dev \
  liblz4-tool libncurses5 libncurses5-dev libreadline-dev libssl-dev \
  libxml2 libxml2-utils lzop pngcrush rsync schedtool squashfs-tools \
  xsltproc zip zlib1g-dev python3 python3-pip
```

### Step 2: Initialize Recovery Source Tree

#### Option A: Building Official OrangeFox 14.1
```bash
mkdir -p ~/android/OrangeFox_14
cd ~/android/OrangeFox_14
git clone https://gitlab.com/OrangeFox/sync.git
cd sync
./orangefox_sync.sh --branch 14.1 --path ~/android/fox_14.1
```

#### Option B: Building TWRP 14.1
```bash
mkdir -p ~/android/twrp_14.1
cd ~/android/twrp_14.1
repo init -u https://github.com/minimal-manifest-twrp/platform_manifest_twrp_aosp.git -b twrp-14.1 --depth=1
repo sync -c -j$(nproc --all) --force-sync --no-clone-bundle --no-tags
```

---

### Step 3: Clone Device Tree & Build

```bash
# Copy / Clone Device Tree into your build source
mkdir -p device/oneplus/oneplus15
git clone https://github.com/sarakanamumamahesh/oneplus15.git device/oneplus/oneplus15

# Set up build environment
source build/envsetup.sh

# Select Lunch Combo (Android 14.1 format: <product>-<release>-<variant>)
# For OrangeFox:
lunch fox_oneplus15-ap2a-userdebug

# For TWRP:
lunch twrp_oneplus15-ap2a-userdebug

# Compile Recovery Vendor Boot Image
mka vendor_bootimage -j$(nproc --all)
```

Output Binary Location:
`out/target/product/oneplus15/vendor_boot.img`

---

## ⚡ Flashing & Testing Guide

> [!WARNING]
> Always test recovery using `fastboot boot` before flashing permanently to avoid accidental bricking!

### 1. Bootloader Unlock
1. Open **Settings** -> **About Device** -> Tap **Build Number** 7 times to enable Developer Options.
2. Go to **Settings** -> **System** -> **Developer Options** -> Enable **OEM Unlocking** and **USB Debugging**.
3. Reboot into Bootloader Mode:
   ```bash
   adb reboot bootloader
   ```
4. Unlock Bootloader (*Note: This action will erase user data*):
   ```bash
   fastboot flashing unlock
   ```

### 2. Test Recovery non-permanently
```bash
fastboot boot out/target/product/oneplus15/vendor_boot.img
```

### 3. Flash Recovery Permanently
Once verified that recovery boots cleanly and touch operates:
```bash
fastboot flash vendor_boot out/target/product/oneplus15/vendor_boot.img
```

---

## 🔧 Essential Fixes & Technical Documentation

### 1. `TARGET_COPY_OUT_VENDOR` Build Fix
- **Issue**: AOSP `board_config.mk` requires `TARGET_COPY_OUT_VENDOR := vendor` when building vendor images.
- **Fix**: Added dynamic partition evaluation loop in `BoardConfig.mk`:
  ```make
  $(foreach p, $(BOARD_PARTITION_LIST), $(eval TARGET_COPY_OUT_$(p) := $(call to-lower, $(p))))
  ```

### 2. `BOARD_SYSTEMSDK_VERSIONS` Limit Fix
- **Issue**: Android 14.1 build system enforces `BOARD_SYSTEMSDK_VERSIONS <= 34` and `>= PRODUCT_SHIPPING_API_LEVEL (34)`.
- **Fix**: Set `BOARD_SYSTEMSDK_VERSIONS := 34` in `BoardConfig.mk` and `device.mk`.

### 3. Gatekeeper & Decryption Enablement
- **Fix**: Configured `vendor.gatekeeper.is_security_level_spu=0` in `system.prop` alongside FBE v2 policy parameters in `BoardConfig.mk`.

---

## 📜 Credits & License

- **OrangeFox Recovery Project**: [https://gitlab.com/OrangeFox](https://gitlab.com/OrangeFox)
- **TeamWin Recovery Project (TWRP)**: [https://github.com/TeamWin](https://github.com/TeamWin)
- **SkyHawk Recovery Project (SHRP)**: [https://github.com/SHRP](https://github.com/SHRP)
- **PitchBlack Recovery Project (PBRP)**: [https://github.com/PitchBlackRecoveryProject](https://github.com/PitchBlackRecoveryProject)
- **License**: Apache 2.0 / GNU General Public License v3
