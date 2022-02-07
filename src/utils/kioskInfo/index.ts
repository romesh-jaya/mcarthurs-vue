export const saveKioskIdToLocalStorage = (data: string) => {
  localStorage.setItem("kioskId", data);
};

export const getKioskIdFromLocalStorage = (): string | null => {
  return localStorage.getItem("kioskId");
};
