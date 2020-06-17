var handler = {
  showDetail: (event, source) => {
    if (!event.target.parentElement.className.includes("target")) return;
    const id =
      event.target.parentElement.parentElement.firstElementChild.innerText;
    
    location.replace(`./details.html?search=${source}&id=${id}`);
    console.log(id);
    console.log(event);
  },
};

export { handler };
