import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import ButtonIcon from '../ui/ButtonIcon';
import useDarkMode from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
