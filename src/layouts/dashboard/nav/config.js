import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Buddies',
    path: '/buddies',
    icon: icon('buddy'),
  },
  {
    title: 'Bundles',
    path: '/bundles',
    icon: icon('bundle'),
  },
  {
    title: 'Player Cards',
    path: '/player-cards',
    icon: icon('player'),
  },
  {
    title: 'Sprays',
    path: '/sprays',
    icon: icon('spray'),
  },
  {
    title: 'Player Titles',
    path: '/titles',
    icon: icon('title'),
  },
  {
    title: 'Weapons',
    path: '/weapons',
    icon: icon('weapon'),
  },
  {
    title: 'Content Tiers',
    path: '/content-tiers',
    icon: icon('diamond'),
  },
];

export default navConfig;
