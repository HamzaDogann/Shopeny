const truncateName = (name, limit) => {
  return name.length > limit ? `${name.substring(0, limit)}...` : name;
};

export default truncateName;