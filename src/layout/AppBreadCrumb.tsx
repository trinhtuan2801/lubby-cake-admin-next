import { routeAliases } from '@/constants';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface Crumb {
  path: string;
  name: string;
}

export default function AppBreadCrumb() {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const result: Crumb[] = [];
    const paths = pathname.split('/').slice(1);
    let currRoute = routeAliases;
    let currPath = '';
    paths.forEach((path) => {
      if (currRoute.subRoutes?.[path]) {
        currRoute = currRoute.subRoutes[path];
        currPath += `/${path}`;
        result.push({
          path: currPath,
          name: currRoute.name,
        });
      }
    });
    return result;
  }, [pathname]);

  return (
    <Breadcrumbs
      size='sm'
      aria-label='breadcrumbs'
      separator={<ChevronRightRoundedIcon fontSize='small' />}
      sx={{ pl: 0 }}
    >
      <Link href='/'>
        <Typography
          color='neutral'
          sx={{ display: 'flex', alignItems: 'center' }}
          fontSize={18}
        >
          <HomeRoundedIcon />
        </Typography>
      </Link>

      {crumbs.map(({ name, path }, index) => {
        if (index === crumbs.length - 1)
          return (
            <Typography
              key={index}
              color='primary'
              fontWeight={500}
              fontSize={12}
            >
              {name}
            </Typography>
          );

        return (
          <Link key={index} color='neutral' href={path}>
            <Typography
              color='neutral'
              fontWeight={500}
              fontSize={12}
              sx={{
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {name}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
