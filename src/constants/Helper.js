// Desc: Helper constants
export const color = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    black: '#000000',
    graph1: '#002034',
    graph2: '#00446f',
    graph3: "#5bc0ff",
    graph4: "#0098f8"
};

// Format number with Indonesian format: thousand separator (.) and decimal separator (,)
// Example: 2853.74 -> 2.853,74
export const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    const numStr = num.toString();
    // Split integer and decimal parts
    const parts = numStr.split('.');
    // Format integer part with thousand separator (dot)
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // If there's decimal part, replace dot with comma
    if (parts.length > 1) {
        return `${integerPart},${parts[1]}`;
    }
    return integerPart;
};

// Format number with fixed 2 decimal places (always shows 2 decimals)
// Example: 6.005 -> 6,00 | 5.9885 -> 5,99 | 417.0255000001 -> 417,03
export const formatNumberWithDecimals = (num, decimals = 2) => {
    if (!num && num !== 0) return '0,' + '0'.repeat(decimals);
    const rounded = (num || 0).toFixed(decimals);
    const parts = rounded.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${integerPart},${parts[1]}`;
};

export const dataPS = [
    {
        id: 1,
        tahun: 2023,
        PS: 3.49,
        status_data: "Data Sementara"
    },
    {
        id: 2,
        tahun: 2022,
        PS: 3.41,
        status_data: "Data Sementara"
    }

]