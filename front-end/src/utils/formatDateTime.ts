export const formatDateTime = (dateString: Date) => {
  return `${new Date(dateString).toLocaleDateString("pt-BR")} às ${new Date(
    dateString
  ).toLocaleTimeString("pt-BR")}`;
};
