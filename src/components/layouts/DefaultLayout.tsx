import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HandymanIcon from '@mui/icons-material/Handyman';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  const router = useRouter()

  const [anchor, setAnchor] = useState<boolean>(false)

  const goto = (path: string) => {
    router.push(path)
    setAnchor(false)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setAnchor(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RepezenDogs
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="temporary"
        open={anchor}
        onClose={() => setAnchor(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goto("/")}>
                <ListItemIcon>
                    <HomeIcon /> 
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto("/mint")}>
                <ListItemIcon>
                    <HandymanIcon /> 
                </ListItemIcon>
                <ListItemText primary="Mint" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto("/market")}>
                <ListItemIcon>
                    <ShoppingCartIcon /> 
                </ListItemIcon>
                <ListItemText primary="Market" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto("/history")}>
                <ListItemIcon>
                    <HistoryIcon /> 
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg">
        {children}
      </Container>
    </div>
  )
}

export default DefaultLayout
