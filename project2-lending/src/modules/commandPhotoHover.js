const commandPhotoHover = () => {
  const command = document.getElementById('command');
  const imgHover = (e) => {
    const target = e.target;
    if (target.matches('.command__photo')) {
      let tmp = target.src;
      target.src = target.dataset.img;
      target.dataset.img = tmp;
    }
  };
  command.addEventListener('mouseover', imgHover);
  command.addEventListener('mouseout', imgHover);
};

export default commandPhotoHover;