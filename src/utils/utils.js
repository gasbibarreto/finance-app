export function getImagePath(path) {
    if (path.startsWith('/images/')) {
        return import.meta.env.BASE_URL + path.slice(1);
    }
    return path;
}
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
export function formatPercentage(amount) {
    return `${(amount).toFixed(2)}`;
}
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
export function formatDateOrdinal(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    let suffix;
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    }
    else if (day === 2 || day === 22) {
        suffix = 'nd';
    }
    else if (day === 3 || day === 23) {
        suffix = 'rd';
    }
    else {
        suffix = 'th';
    }
    return `Monthly-${day}${suffix}`;
}
export const dataSortFunction = {
    Latest: function latest(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    },
    Oldest: function oldest(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    },
    'A to Z': function aToZ(a, b) {
        return a.name.localeCompare(b.name);
    },
    'Z to A': function zToA(a, b) {
        return b.name.localeCompare(a.name);
    },
    Highest: function highest(a, b) {
        return b.amount - a.amount;
    },
    Lowest: function lowest(a, b) {
        return a.amount - b.amount;
    },
};
