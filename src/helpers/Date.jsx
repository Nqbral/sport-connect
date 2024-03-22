export default {
    formatClientDate: (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    },

    formatClientDateTime: (date) => {
        return new Date(parseInt(date)).toLocaleString('fr-FR');
    },
};
