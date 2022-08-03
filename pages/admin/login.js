import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid } from "react-loader-spinner";
import { parse } from "cookie";
import Head from "next/head";

export default function AdminLogin(props) {
  const router = useRouter();
  const [submissionOnProgress, setSubmissionOnProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setSubmissionOnProgress(true);
    const formdata = new FormData(document.forms.admin_login);
    let login_payload = {};
    for (let key of formdata.keys()) {
      login_payload[key] = formdata.get(key);
    }
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify(login_payload),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (res.error) {
        setErrorMsg(res.info);
      }
    } catch (err) {
      setErrorMsg("Something went wrong, try again.");
    }
    setSubmissionOnProgress(false);
    router.push("/admin/orders");
  };
  return (
    <>
      <Head>
        <title>Login | Admin panel</title>
      </Head>
      <div className="admin_container">
        <div className="admin_panel_title">
          <div>One More Chapter - admin</div>
        </div>
        <Paper elevation={4} className="checkout_form_container">
          {!submissionOnProgress && (
            <form
              style={{ marginTop: 20 }}
              method="POST"
              name="admin_login"
              id="admin_login"
              onSubmit={submit}
            >
              <div style={{ fontSize: 14, color: "red", textAlign: "center" }}>
                {errorMsg}
              </div>
              <label>
                Username
                <PersonIcon sx={{ position: "relative", left: 10, top: 6 }} />
              </label>
              <input
                type="text"
                required
                name="username"
                label="username"
                aria-label="username"
              ></input>
              <label>
                Password
                <KeyIcon sx={{ position: "relative", left: 10, top: 6 }} />
              </label>
              <input
                type="password"
                required
                name="password"
                label="password"
                aria-label="password"
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    background: "rgb(57 172 57)",
                    "&:hover": { background: "rgb(47 138 47)" },
                  }}
                  type="submit"
                  form="admin_login"
                >
                  Sign In
                </Button>
              </div>
            </form>
          )}
          {submissionOnProgress && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Grid
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperClass=""
                visible={true}
              />
              <div style={{ marginTop: 30, color: "grey" }}>Please wait</div>
            </div>
          )}
        </Paper>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { isTokenValid } = await import("../api/admin/auth");
  const { token } = parse(context.req.headers.cookie || "");
  if (isTokenValid(token))
    return {
      redirect: {
        permanent: false,
        destination: `/admin/orders`,
      },
    };
  return {
    props: {},
  };
}
