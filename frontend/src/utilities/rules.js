// BuildLab Compatibility Rules Engine
export const checkCompatibility = (currentBuild, nextPart) => {
    // 1. CPU vs Motherboard (Socket Match)
    if (currentBuild.cpu && nextPart.category === 'motherboard') {
        if (currentBuild.cpu.socket_type !== nextPart.socket_type) {
            return {
                compatible: false,
                reason: `Socket Mismatch! Ang CPU mo ay ${currentBuild.cpu.socket_type}, pero ang pinili mong motherboard ay ${nextPart.socket_type}.`,
                tip: "Siguraduhin na pareho ang socket type ng Motherboard at CPU para magkasya sila."
            };
        }
    }

    // 2. Motherboard vs CPU (Reverse check)
    if (currentBuild.motherboard && nextPart.category === 'cpu') {
        if (currentBuild.motherboard.socket_type !== nextPart.socket_type) {
            return {
                compatible: false,
                reason: `Socket Mismatch! Ang motherboard mo ay ${currentBuild.motherboard.socket_type}, pero ang pinili mong CPU ay ${nextPart.socket_type}.`,
                tip: "Siguraduhin na pareho ang socket type ng Motherboard at CPU para magkasya sila."
            };
        }
    }

    // 3. RAM vs Motherboard (DDR Type)
    if (currentBuild.ram && nextPart.category === 'motherboard') {
        if (currentBuild.ram.ddr_type !== nextPart.ddr_type) {
            return {
                compatible: false,
                reason: `RAM Type Mismatch! Ang RAM mo ay ${currentBuild.ram.ddr_type}, pero ang motherboard ay ${nextPart.ddr_type}.`,
                tip: "Siguraduhin na compatible ang RAM type sa motherboard (DDR4 o DDR5)."
            };
        }
    }

    // 4. Motherboard vs RAM (Reverse check)
    if (currentBuild.motherboard && nextPart.category === 'ram') {
        if (currentBuild.motherboard.ddr_type !== nextPart.ddr_type) {
            return {
                compatible: false,
                reason: `RAM Type Mismatch! Ang motherboard mo ay ${currentBuild.motherboard.ddr_type}, pero ang RAM ay ${nextPart.ddr_type}.`,
                tip: "Siguraduhin na compatible ang RAM type sa motherboard (DDR4 o DDR5)."
            };
        }
    }

    // 5. GPU Power Requirements vs PSU
    if (currentBuild.gpu && nextPart.category === 'psu') {
        if (nextPart.wattage < currentBuild.gpu.power_required) {
            return {
                compatible: false,
                reason: `Insufficient Power! Ang GPU mo ay nangangailangan ng ${currentBuild.gpu.power_required}W, pero ang PSU ay ${nextPart.wattage}W lang.`,
                tip: "Pumili ng PSU na may mas mataas na wattage kaysa sa kabuuang power requirements ng system."
            };
        }
    }

    // 6. PSU vs GPU (Reverse check)
    if (currentBuild.psu && nextPart.category === 'gpu') {
        if (currentBuild.psu.wattage < nextPart.power_required) {
            return {
                compatible: false,
                reason: `Insufficient Power! Ang GPU na ito ay nangangailangan ng ${nextPart.power_required}W, pero ang PSU mo ay ${currentBuild.psu.wattage}W lang.`,
                tip: "Pumili ng PSU na may mas mataas na wattage kaysa sa kabuuang power requirements ng system."
            };
        }
    }

    // 7. Case Form Factor Compatibility (Basic check)
    if (currentBuild.case && nextPart.category === 'motherboard') {
        // This is a simplified check - in reality, cases support multiple form factors
        const supportedFormFactors = ['ATX', 'mATX', 'Mini-ITX'];
        if (!supportedFormFactors.includes(nextPart.form_factor || 'ATX')) {
            return {
                compatible: false,
                reason: `Form Factor Issue! Ang case mo ay maaaring hindi supportahan ang ${nextPart.form_factor || 'ATX'} motherboard.`,
                tip: "Check the case specifications for supported motherboard form factors."
            };
        }
    }

    return { compatible: true, message: "Compatible! Good choice." };
};

// Calculate total system power requirements
export const calculatePowerRequirements = (build) => {
    let totalWatts = 0;

    if (build.cpu) totalWatts += parseInt(build.cpu.tags.find(tag => tag.includes('W'))?.replace('W', '') || '65');
    if (build.gpu) totalWatts += build.gpu.power_required || 150;
    if (build.motherboard) totalWatts += 50; // Base motherboard power
    if (build.ram) totalWatts += 10; // RAM power
    if (build.storage) totalWatts += 10; // Storage power

    // Add 20% overhead for safety
    totalWatts = Math.ceil(totalWatts * 1.2);

    return totalWatts;
};

// Get compatibility summary for all components
export const getCompatibilitySummary = (build) => {
    const issues = [];
    const components = Object.entries(build).filter(([key, value]) => value !== null);

    // Check all pairwise combinations
    for (let i = 0; i < components.length; i++) {
        for (let j = i + 1; j < components.length; j++) {
            const [cat1, comp1] = components[i];
            const [cat2, comp2] = components[j];

            // Check compatibility in both directions
            const result1 = checkCompatibility({ [cat1]: comp1 }, { ...comp2, category: cat2 });
            const result2 = checkCompatibility({ [cat2]: comp2 }, { ...comp1, category: cat1 });

            if (!result1.compatible) {
                issues.push({
                    components: [cat1, cat2],
                    issue: result1.reason,
                    tip: result1.tip
                });
            }
            if (!result2.compatible && result2.reason !== result1.reason) {
                issues.push({
                    components: [cat2, cat1],
                    issue: result2.reason,
                    tip: result2.tip
                });
            }
        }
    }

    return issues;
};