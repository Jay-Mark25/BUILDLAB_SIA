// BuildLab Compatibility Rules Engine
export const checkCompatibility = (currentBuild, nextPart) => {
    // 1. CPU vs Motherboard (Socket Match)
    if (currentBuild.cpu && nextPart.category === 'Motherboard') {
        if (currentBuild.cpu.socket_type !== nextPart.socket_type) {
            return {
                compatible: false,
                reason: `Socket Mismatch! Ang CPU mo ay ${currentBuild.cpu.socket_type}, pero ang pinili mong motherboard ay ${nextPart.socket_type}.`,
                tip: "Siguraduhin na pareho ang socket type ng Motherboard at CPU para magkasya sila."
            };
        }
    }

    // 2. RAM vs Motherboard (DDR Type)
    // Dito papasok yung logic for DDR4/DDR5 later...

    return { compatible: true, message: "Compatible! Good choice." };
};