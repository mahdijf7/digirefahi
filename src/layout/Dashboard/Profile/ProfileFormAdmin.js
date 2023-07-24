import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import SubmitButtonFill from 'components/Common/Form/SubmitButtonFill';
import { Grid, Typography, Button, Box, CircularProgress, Avatar } from '@mui/material';
import CustomAutocomplete from '../../../components/Common/Form/CustomAutocomplete';
import { theme } from '../../../assets/theme/default';
// import JalaliDatePicker from "../../components/Form/JalaliDatePicker";
// import ButtonBack from "../../components/Common/Buttons/ButtonBack";
import DashboardCard from '../../../components/Common/Card/DashboardCard';
// import CustomProfileChekbox from "../../components/Common/Checkbox/CustomProfileChekbox";
import ButtonSendImage from '../../../components/Common/Buttons/ButtonSendImage';
import useImage from '../../../hooks/use-image';
import UserProfile from '../../../assets/icone/svg/UserProfile';
import UserProfileEdit from '../../../assets/icone/svg/UserProfileEdit';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

function ProfileFormAdmin(props) {
  const { Initial_Values, handleSubmit, interestList, loading } = props;
  const {
    image,
    setImage,
    fileHandler,
    uploadFileHandler,
    fileInputRef,
    open,
    setOpen,
    preview,
    setPreview,
  } = useImage(() => {}, 'name');
  const { t } = useTranslation();

  const Validation_Schema = Yup.object({
    organizationName: Yup.string(''),
    organizationType: Yup.string(''),
    registrationNumber: Yup.string(''),
    economicCode: Yup.string(''),
    email: Yup.string(''),
    chartLevel: Yup.string(''),
    group: Yup.string(''),
    CEOName: Yup.string(''),
    CEOPhone: Yup.string(''),
    agentName: Yup.string(''),
    agentPhone: Yup.string(''),
    phoneNumber: Yup.string(''),
    postalCode: Yup.string(''),
    address: Yup.string(''),
    secondAddress: Yup.string(''),
  });

  return (
    <DashboardCard pt="2rem">
      {/* <Breadcrumb data={linkData} /> */}
      <Box p="3rem" height="100%" bgcolor="common.white" borderRadius="1.4rem" boxShadow={1}>
        <Formik
          initialValues={Initial_Values}
          validationSchema={Validation_Schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid
              className="column"
              alignItems="space-between"
              justifyContent="space-between"
              container
            >
              <Grid item mt="1rem" xs={10} sm={12}>
                <Box position="relative">
                  <Box>
                    <UserProfile />
                  </Box>
                  <Box position="absolute" top="3.5rem" right="-1rem">
                    <UserProfileEdit />
                  </Box>
                  <ButtonSendImage
                    fileHandler={fileHandler}
                    // propsStyle={}
                    fileInputRef={fileInputRef}
                    loading={false}
                  ></ButtonSendImage>
                </Box>
              </Grid>
              <Grid item mt="1rem" xs={10} sm={12}>
                <Typography variant="h2">{t('firstLogin.pleaseCompleteYourProfile')}</Typography>
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="organizationName"
                  title={t('admin.organizationName')}
                  placeholder={t('admin.organizationName')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="organizationType"
                  title={t('admin.organizationType')}
                  placeholder={t('admin.organizationType')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="registrationNumber"
                  title={t('admin.registrationNumber')}
                  placeholder={t('admin.registrationNumber')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="economicCode"
                  title={t('admin.economicCode')}
                  placeholder={t('admin.economicCode')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomAutocomplete
                  showlabel="true"
                  sx={inputStyle}
                  // icon={<Category />}
                  options={top100Films}
                  id={t('admin.employeCount')}
                  placeholder={t('admin.chooseEmployeCount')}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="email"
                  title={t('admin.email')}
                  placeholder={t('admin.email')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="chartLevel"
                  title={t('profile.chartLevel')}
                  placeholder={t('profile.chartLevelP')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="group"
                  title={t('profile.group')}
                  placeholder={t('profile.groupP')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="CEOName"
                  title={t('admin.CEOName')}
                  placeholder={t('admin.CEOName')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="CEOPhone"
                  title={t('admin.CEOPhone')}
                  placeholder={t('admin.CEOPhone')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="agentName"
                  title={t('admin.agentName')}
                  placeholder={t('admin.agentName')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="agentPhone"
                  title={t('admin.agentPhone')}
                  placeholder={t('admin.agentPhone')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="phoneNumber"
                  title={t('admin.phoneNumber')}
                  placeholder={t('admin.phoneNumber')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="postalCode"
                  title={t('admin.postalCode')}
                  placeholder={t('admin.postalCode')}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomAutocomplete
                  showlabel="true"
                  sx={inputStyle}
                  // icon={<Category />}
                  options={top100Films}
                  id={t('admin.state')}
                  placeholder={t('admin.state')}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item mt="1rem" xs={10} sm={5.6}>
                <CustomAutocomplete
                  showlabel="true"
                  sx={inputStyle}
                  // icon={<Category />}
                  options={top100Films}
                  id={t('admin.city')}
                  placeholder={t('admin.city')}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item mt="1rem" xs={12} sm={12}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="address"
                  title={t('admin.address')}
                  placeholder={t('admin.address')}
                />
              </Grid>
              <Grid item mt="1rem" xs={12} sm={12}>
                <CustomInputBase
                  height="5.3rem"
                  borderRadius=".8rem"
                  sx={inputStyle}
                  showlabel="true"
                  name="secondAddress"
                  title={t('admin.secondAddress')}
                  placeholder={t('admin.address')}
                />
              </Grid>
              {/* <Box width="100%" height="20rem">
            <CustomProfileChekbox data={interestList} label="" />
          </Box> */}

              <Grid item xs={10} sm={6} className="flex" justifyContent="flex-start" mt="2rem">
                <SubmitButtonFill
                  onClick={() => props.setNextStep(true)}
                  disabled={loading}
                  width="15%"
                >
                  {!loading ? (
                    <Typography fontSize="1.7rem" variant={'body3'}>
                      {t('profile.confirmData')}
                    </Typography>
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </SubmitButtonFill>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </DashboardCard>
  );
}

export default ProfileFormAdmin;

const inputStyle = {
  backgroundColor: theme.palette.info.input,
  borderRadius: '.8rem !important',
  '& .MuiOutlinedInput-root': {
    height: '5.3rem',
    color: ` ${theme.palette.common.black}`,
    '& fieldset': {
      border: `.1rem solid ${theme.palette.info.border} `,
    },
  },
  '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
    paddingRight: '7%',
    borderRadius: '.8rem !important',
  },
  '& .MuiAutocomplete-endAdornment': {
    right: '90% !important',
    '& svg': {
      width: '3rem',
      height: '3rem',
    },
  },
};
