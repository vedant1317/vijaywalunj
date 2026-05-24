const generateReferenceId = () => {
  const prefix = 'VW';
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}-${random}`;
};

export default generateReferenceId;
