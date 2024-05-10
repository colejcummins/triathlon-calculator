import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import {Sun, Moon} from 'react-feather';
import { Tooltip } from '@mui/joy';

export const DarkModeToggle = () => {
  const {mode, setMode} = useColorScheme();

  return (
    <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Ligth Mode'} variant="plain">
      <Button onClick={() => mode === 'light' ? setMode('dark') : setMode('light')} variant="plain">
        {mode === 'light' ? <Moon /> : <Sun />}
      </Button>
    </Tooltip>
  )

}