import addOpacity from 'utils/addOpacity';

const SIZE = 100;

export default (isDarkMode) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
  },
  clickable: {
    cursor: 'pointer',
  },
  img: {
    width: SIZE,
    height: SIZE,
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: (theme) =>
      `${theme.spacing(0, 2, 5)} ${addOpacity(
        isDarkMode ? theme.palette.white : theme.palette.black,
        50
      )}`,
  },
  fadeBlock: {
    width: SIZE,
    height: SIZE,
    backgroundColor: (theme) => addOpacity(theme.palette.neutral.main, 60),
    position: 'absolute',
    top: 0,
    borderRadius: '50%',
    transition: (theme) => theme.transition.normal,
    opacity: 0,
  },
  faded: {
    opacity: 1,
  },
  imgWrapper: {
    position: 'relative',
  },
  title: {
    transition: (theme) => theme.transition.normal,
    color: (theme) => theme.palette.black,
  },
  textFaded: {
    color: (theme) => addOpacity(theme.palette.black, 60),
  },
});
