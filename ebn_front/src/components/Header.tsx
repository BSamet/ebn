import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';







interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}


export default function Header(props: HeaderProps) {
  const { sections, title } = props;

 
  
  
  
  

  return (
    <div className="header">
    <React.Fragment>
     
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <NavLink
        to = "Inscription"
        >
        <Button size="small">Rejoignez nous !</Button>
        </NavLink>
        <Typography
          component="h1"
          variant="h5"         
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
         
        </IconButton>
        
        <NavLink
        to = "/Connection">
        <Button variant="outlined" size="small">
          Connectez vous
         
        </Button>
        </NavLink>
        
       
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
            
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
    </div>
  );
}



