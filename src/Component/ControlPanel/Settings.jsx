import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [open, setOpen] = useState(true);
  const [Secton1, setSection1] = useState("empty");
  const [anchorEl, setAnchorEl] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState({});
  const navigate = useNavigate();
  const user = {
    avatar: "https://via.placeholder.com/150",
  };

  const SignOut = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Logout`, {
        withCredentials: true,
      });
      navigate("/SignIn");
    } catch (error) {}
  };
  const GetProfileItems = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Profile`,
        {
          withCredentials: true,
        }
      );
      setDecodedTokken(data);
    } catch (error) {
      console.log(error);
    }
  };
  // فتح القائمة
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // إغلاق القائمة
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleclick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    GetProfileItems();
  }, []);
  return (
    <>
      <div className="d-flex">
        <List
          id="Settings-List"
          sx={{
            width: "100%",
            maxWidth: 360,
            textAlign: "center",
            fontWeight: "900",
          }}
          component="nav"
          aria-labelledby="الإعدادات"
          subheader={
            <ListSubheader
              style={{
                fontSize: "30px",
                color: "black",
                fontWeight: "900",
                border: "solid",
                borderRadius: "7px",
                borderWidth: "0.1px",
                borderColor: "green",
              }}
              component="div"
              id="nested-list-subheader"
            >
              الإعدادات{" "}
            </ListSubheader>
          }
        >
          <ListItemButton
            id="Settings-List-button"
            onClick={() => setSection1("section1")}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="المعلومات الشخصيه" />
          </ListItemButton>
          <ListItemButton
            id="Settings-List-button"
            onClick={() => setSection1("section2")}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            id="Settings-List-button"
            onClick={() => setSection1("section3")}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>

        {Secton1 == "section1" ? (
          <>
            <Grid
              container
              spacing={2}
              sx={{ padding: 2, justifyContent: "center" }}
            >
              {/* تصميم ملف المستخدم */}
              <Grid item xs={12} md={9}>
                <Card
                  sx={{
                    padding: 3,
                    borderRadius: 4,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    background:
                      "linear-gradient(135deg,rgb(33, 109, 41),rgb(54, 82, 62))",
                    color: "white",
                  }}
                >
                  {/* الصورة الرمزية */}
                  <Avatar
                    src={user.avatar}
                    alt={DecodedTokken.fullName}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "auto",
                      border: "4px solid white",
                      boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
                    }}
                  />

                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                      {DecodedTokken.fullName}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                      {DecodedTokken.email} :البريد الإلكتروني
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      {DecodedTokken.id} :رقم المعرف
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      {DecodedTokken.role} :المهنه
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      {DecodedTokken.phoneNumber} :الهاتف
                    </Typography>

                    {/* خط فاصل */}
                    <Divider
                      sx={{
                        my: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                      }}
                    />

                    {/* أزرار التحكم */}
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{
                          backgroundColor: "white",
                          color: "#0072ff",
                          fontWeight: "bold",
                        }}
                      >
                        تعديل الملف
                      </Button>
                      <Button
                        onClick={() => SignOut()}
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        sx={{
                          color: "white",
                          borderColor: "white",
                          fontWeight: "bold",
                        }}
                      >
                        تسجيل الخروج
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : Secton1 == "section2" ? (
          <>
            {" "}
            <h1>drafts</h1>
          </>
        ) : Secton1 == "section3" ? (
          <>
            <h1>inbox</h1>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Settings;
