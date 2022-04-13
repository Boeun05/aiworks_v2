import React, { useState, useEffect } from 'react';
import Input from '@/component/common/Input';
import Select from '@/component/common/Select';
import LabelInput from '@/component/common/LabelInput';
import { apiHelper } from '@/utils/api';

function SignupView() {
  const [ageOptions, setAgeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [registerInfo, setRegisterInfo] = useState({
    login_id: '',
    password: '',
    email: '',
    name: '',
    birthday: '',
    gender_cd: '',
    age_cd: '',
    region_cd: '',
    phone: '',
    zip_code: '',
    address1: '',
    address2: '',
    is_sms: '',
    is_email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const getSelectOption = async () => {
    const codeType = ['gender', 'age'];
    const response = await apiHelper.post('/codes/type', { code_type: codeType });
    const responsedData = response.data;
    const genderDatas = responsedData?.filter((data) => data.code_type === 'gender');
    const ageDatas = responsedData?.filter((data) => data.code_type === 'age');
    setGenderOptions(genderDatas);
    setAgeOptions(ageDatas);
  };

  const handleSelectChange = (name, option) => {
    setRegisterInfo({
      ...registerInfo,
      [name]: option,
    });
  };

  useEffect(() => {
    getSelectOption();
  }, []);

  useEffect(() => {
    console.log(registerInfo);
  }, [registerInfo]);

  const { login_id, password, email, name, birthday, gender_cd, age_cd, region_cd, phone, zip_code, address1, address2, is_sms, is_email } = registerInfo;
  return (
    <div className="signup">
      <LabelInput name="아이디">
        <Input placeholder="아이디" name="login_id" value={login_id} onChange={handleInputChange} />
      </LabelInput>
      <LabelInput name="패스워드">
        <Input placeholder="패스워드" name="password" value={password} onChange={handleInputChange} />
      </LabelInput>
      <LabelInput name="이메일">
        <Input placeholder="이메일" name="email" value={name} onChange={handleInputChange} autoComplete="off" />
      </LabelInput>
      <LabelInput name="이름">
        <Input placeholder="이름" name="name" value={name} onChange={handleInputChange} />
      </LabelInput>
      <Select defaultText="남" defaultValue="MAN" name="gender_cd" options={genderOptions} onChange={handleSelectChange} />
      <Select defaultText="10대" defaultValue="AGE1" name="age_cd" options={ageOptions} onChange={handleSelectChange} />
      <style jsx>{`
        @media (min-width: 992px) {
          .signup {
            margin-left: 33.33333333%;
            float: left;
            width: 33.33333333%;
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }
        }

        @media (max-width: 991px) and (min-width: 768px) {
          .signup {
            margin-left: 16.66666667%;
            width: 66.66666667%;
            float: left;
          }
        }

        @media (max-width: 767px) {
          .signup {
            margin-left: 8.33333333%;
            width: 83.33333333%;
            float: left;
          }
        }
      `}</style>
    </div>
  );
}

export default SignupView;
