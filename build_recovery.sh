#!/usr/bin/env bash
#
# OrangeFox Recovery Automated Build Script for OnePlus 15
#

set -e

WORK_DIR="$(pwd)"
ORANGEFOX_BRANCH="fox_12.1"
DEVICE_CODE="oneplus15"
LUNCH_TARGET="fox_${DEVICE_CODE}-userdebug"

echo "=========================================================="
echo " Starting OrangeFox Build Setup for OnePlus 15 ($DEVICE_CODE)"
echo "=========================================================="

# 1. Check Repo & Dependencies
if ! command -v repo &> /dev/null; then
    echo "[!] 'repo' tool is not installed. Installing repo tool..."
    mkdir -p ~/.bin
    PATH="${HOME}/.bin:${PATH}"
    curl https://storage.googleapis.com/git-repo-downloads/repo > ~/.bin/repo
    chmod a+rx ~/.bin/repo
fi

# 2. Sync Manifest (if running inside full build workspace)
if [ ! -d ".repo" ]; then
    echo "[*] Initializing OrangeFox Recovery Source Tree..."
    repo init -u https://gitlab.com/OrangeFox/Manifest.git -b ${ORANGEFOX_BRANCH} --depth=1
    echo "[*] Syncing OrangeFox Repositories (this can take a while)..."
    repo sync -c -j$(nproc --all) --force-sync --no-clone-bundle --no-tags
fi

# 3. Setup Environment
echo "[*] Setting up build environment..."
source build/envsetup.sh

# 4. Lunch Target
echo "[*] Selecting lunch target: ${LUNCH_TARGET}..."
lunch ${LUNCH_TARGET}

# 5. Build Recovery / Vendor Boot Image
echo "[*] Building OrangeFox Recovery Image..."
mka vendor_bootimage -j$(nproc --all) || mka recoveryimage -j$(nproc --all)

echo "=========================================================="
echo " Build Complete!"
echo " Output images located in: out/target/product/${DEVICE_CODE}/"
echo "=========================================================="
