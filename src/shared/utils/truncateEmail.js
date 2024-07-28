const truncateEmail = (email, limit) => {
    const [localPart, domain] = email.split('@');
    const truncatedLocalPart = localPart.length > limit ? `${localPart.substring(0, limit)}...` : localPart;
    return `${truncatedLocalPart}@${domain}`;
};

export default truncateEmail;