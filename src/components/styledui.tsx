import { Launch } from "@mui/icons-material";
import { AppBar, Button, Paper, styled, TextField, Theme, Typography } from "@mui/material";

export const BorderPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    overflow: 'hidden',
}));

export const NoDecorationTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

export const SelectTypography = styled(Typography)(({ theme }) => ({
    transitionDuration: "0.3s",
    color: theme.palette.text.disabled,
    "&:hover": {
        color: theme.palette.text.primary,
    },
}));

export const StyledLaunch = styled(Launch)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

export const AboutBodyTypography = styled(Typography)(({ theme }) => ({
    variant: "body1",
    whiteSpace: "pre-line",
}));

type PaperAppBarProps = {
    istransparent: boolean;
}
export const PaperAppBar = styled(AppBar)<PaperAppBarProps>(({ theme, istransparent }) => {
    const backgroundColorDefault = theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.grey[900];
    const background = istransparent ? "transparent" : backgroundColorDefault;

    return ({
        boxShadow: "none",
        transition: "background-color 0.3s",
        background: background,
    });
});

export const Div = styled(`div`)(({ theme }) => ({}));

export const SimpleButton = styled(Button)(({ theme }) => {
    if (theme.palette.mode === "light") {

        return ({
            color: theme.palette.text.primary,
            borderColor: theme.palette.grey[400],
            "&:hover": {
                borderColor: theme.palette.text.primary,   
                backgroundColor: theme.palette.grey[50],
            }
        })
    }
});