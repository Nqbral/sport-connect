export default {
    formatClientDateTime: (date) => {
        return new Date(parseInt(date)).toLocaleString('fr-FR');
    },
};
