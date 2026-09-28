# OrangeFox Custom Recovery for OnePlus 15 (Android 15 / Snapdragon 8 Elite)

This repository contains the complete **OrangeFox Recovery** device tree and step-by-step porting guide for the **OnePlus 15** (Codename: `oneplus15`).

---

## 📐 Architecture Overview

| Attribute | Specification |
| :--- | :--- |
| **SoC Platform** | Qualcomm Snapdragon 8 Elite (SM8750 / `pineapple`) |
| **Android Version** | Android 15 (GKI Kernel 6.6+) |
| **Boot Header** | Version 4 |
| **Partition Scheme** | Virtual A/B with Dynamic Partitions (`super`) |
| **Recovery Location** | Integrated in `vendor_boot.img` ramdisk |
| **System File Format**| EROFS (Read-Only system/vendor) |
| **User Data Format**  | F2FS with File-Based Encryption (FBE v2) |

---

## 📁 Repository Structure

```
.
├── build_recovery.sh                     # Automated build execution script
├── device/
│   └── oneplus/
│       └── oneplus15/                    # OnePlus 15 Device Tree
│           ├── Android.mk                # Target build inclusion rule
│           ├── AndroidProducts.mk        # Lunch targets (fox_oneplus15)
│           ├── BoardConfig.mk            # Hardware, kernel, & OrangeFox config
│           ├── device.mk                 # Virtual A/B & Dynamic partition flags
│           ├── fox_oneplus15.mk          # Product specs & OrangeFox branding
│           ├── recovery.fstab            # Partition mount map
│           └── twrp.flags                # OrangeFox GUI partition options
└── README.md                             # Documentation & Porting Guide
```

---

## 🛠️ Step-by-Step Porting & Building Guide

### Step 1: Extract Kernel & Ramdisk from Stock Firmware

To build a fully functional kernel ramdisk, you need to extract `vendor_boot.img`, `boot.img`, `dtbo.img`, and `init_boot.img` from an official OnePlus 15 OxygenOS OTA payload.

1. Download the official OxygenOS firmware zip.
2. Extract `payload.bin` using `payload-dumper-go`:
   ```bash
   payload-dumper-go -p boot,vendor_boot,init_boot,dtbo payload.bin
   ```
3. Copy the extracted prebuilt kernel (`Image`) and DTB into `device/oneplus/oneplus15/prebuilt/`.

---

### Step 2: Set Up Build Environment

Ensure your host operating system (Ubuntu 22.04 LTS or 24.04 LTS recommended) has all build dependencies:

```bash
sudo apt-get update
sudo apt-get install -y bc bison build-essential ccache curl flex g++-multilib \
    gcc-multilib git git-lfs gnupg gperf lib32ncurses5-dev lib32z1-dev \
    liblz4-tool libncurses5 libncurses5-dev libreadline-dev libssl-dev \
    libxml2 libxml2-utils lzop pngcrush rsync schedtool squashfs-tools \
    xsltproc zip zlib1g-dev python3 python3-pip
```

---

### Step 3: Initialize OrangeFox Source & Build

Run the provided script to initialize the OrangeFox `fox_12.1` manifest and trigger the build:

```bash
chmod +x build_recovery.sh
./build_recovery.sh
```

Or run manually:

```bash
# Initialize and sync source
repo init -u https://gitlab.com/OrangeFox/Manifest.git -b fox_12.1 --depth=1
repo sync -c -j$(nproc --all)

# Set up build env
source build/envsetup.sh
lunch fox_oneplus15-userdebug

# Build Vendor Boot Image containing Recovery
mka vendor_bootimage -j$(nproc --all)
```

Output binary location:
`out/target/product/oneplus15/vendor_boot.img`

---

## ⚡ Flashing & Testing Instructions

> [!WARNING]
> **DO NOT** flash recovery directly without testing via `fastboot boot` first!

### 1. Bootloader Unlock
On your OnePlus 15:
1. Enable **Developer Options** (Tap `Build Number` 7 times).
2. Enable **OEM Unlocking** and **USB Debugging**.
3. Reboot to fastboot mode:
   ```bash
   adb reboot bootloader
   ```
4. Unlock bootloader (Wipes user data):
   ```bash
   fastboot flashing unlock
   ```

### 2. Test Recovery (Non-Permanent)
```bash
fastboot boot out/target/product/oneplus15/vendor_boot.img
```
*If recovery boots successfully and touchscreen works, proceed to installation.*

### 3. Flash Recovery Permanently
```bash
fastboot flash vendor_boot out/target/product/oneplus15/vendor_boot.img
```

---

## 🔧 Troubleshooting & Key Fixes

### Issue 1: Touchscreen Not Responding
- **Cause**: Missing input kernel modules or device tree touch nodes.
- **Fix**: Add touch driver kernel modules (`.ko` files from stock vendor ramdisk) into `BoardConfig.mk`:
  ```make
  BOARD_VENDOR_RAMDISK_KERNEL_MODULES += $(wildcard device/oneplus/oneplus15/modules/*.ko)
  ```

### Issue 2: Decryption Failure (`/data` internal storage shown as `0MB` or garbled)
- **Cause**: Missing Keymint HAL services or updated Android 15 FBE v2 policy keys.
- **Fix**: Ensure `TW_INCLUDE_CRYPTO := true` and `BOARD_USES_QCOM_FSCRYPT_V2 := true` are set in [BoardConfig.mk](file:///config/Desktop/Session1/device/oneplus/oneplus15/BoardConfig.mk).

---

## 📜 License & Credits

- **OrangeFox Recovery Project**: [https://orangefox.recovery.gq](https://orangefox.recovery.gq)
- **TWRP Project**: [https://twrp.me](https://twrp.me)
- **Licence**: Apache 2.0 / GPL v3
