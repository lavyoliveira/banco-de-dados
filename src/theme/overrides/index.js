import Card from './Card';
import Paper from './Paper';
import Backdrop from './Backdrop';
import Typography from './Typography';

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Paper(theme),
    Backdrop(theme),
    Typography(theme),
  );
}
