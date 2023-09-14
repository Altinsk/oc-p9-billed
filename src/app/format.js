export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const ye = date.getFullYear();
  const mo = "" + ( date.getMonth() + 1 )
  const da = "" + date.getDate()
  const month = mo.charAt(0).toUpperCase() + mo.slice(1)


  return `${ye}-${mo}-${da}`
  
  // `${parseInt(da)} ${month.substr(0,3)}. ${ye.toString().substr(2,4)}`
}
 
export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "accepted":
      return "Accepté"
    case "refused":
      return "Refused"
  }
}