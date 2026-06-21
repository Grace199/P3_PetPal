import React from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ajax } from '../../../util/ajax';
import AuthLayout from '../../../components/Auth/AuthLayout';
import AuthField from '../../../components/Auth/AuthField';
import AuthButton from '../../../components/Auth/AuthButton';
import AccountTypeToggle from '../../../components/Auth/AccountTypeToggle';
import AuthSelect from '../../../components/Auth/AuthSelect';
import { PROVINCES } from '../../../components/Auth/provinces';

const Index = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: null,
    account: null,
    address: null,
    city: null,
    province: null,
    phone_number: null,
    description: null
  },);

  useEffect(() => {
    setErrors({});
  }, [navigate]);


  const [formData, setFormData] = useState({
    account: {
      email: null,
      name: null,
      password1: null,
      password2: null
    },
    address: null,
    city: null,
    province: null,
    phone_number: null,
    description: null
  });

  const handleInputChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeFormAccount = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      account: {
        ...formData.account, [name]: value
      }
    });
  };


  async function handle_submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    try {
      const res = await ajax(`/accounts/shelter/signup/`, requestOptions);

      if (!res.ok) {
        const json = await res.json();
        setErrors(json);
      }
      else {
        navigate("/login/");
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
    }


  }

  return (
    <AuthLayout title="Register your shelter" subtitle="Create a shelter account to list pets for adoption.">
      <AccountTypeToggle active="shelter" />
      <form className="flex flex-col gap-4" onSubmit={handle_submit}>
        <AuthField label="Shelter Name" type="text" id="name" name="name" required
          onChange={handleInputChangeFormAccount} error={errors?.account?.name} />
        <AuthField label="Email" type="email" id="email" name="email" required
          onChange={handleInputChangeFormAccount} error={errors?.account?.email} />
        <AuthField label="Password" type="password" id="password1" name="password1" required
          onChange={handleInputChangeFormAccount} error={errors?.account?.password1} />
        <AuthField label="Confirm Password" type="password" id="password2" name="password2" required
          onChange={handleInputChangeFormAccount} error={errors?.account?.password2} />

        <AuthField label="Address" type="text" id="address" name="address" required
          onChange={handleInputChangeForm} error={errors?.address} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthField label="City" type="text" id="city" name="city" required
            onChange={handleInputChangeForm} error={errors?.city} />
          <AuthSelect label="Province" id="province" name="province" required
            onChange={handleInputChangeForm} error={errors?.province}>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </AuthSelect>
        </div>
        <AuthField label="Phone Number" type="text" id="phone_number" name="phone_number" required
          onChange={handleInputChangeForm} error={errors?.phone_number} />
        <AuthField label="Description" type="text" id="description" name="description" required
          onChange={handleInputChangeForm} error={errors?.description} />

        <AuthButton type="submit" onClick={handle_submit}>Create your free account</AuthButton>

        <p className="text-center text-sm text-text/70">
          Already have an account?
          <Link to="/login/" className="text-accent-100 font-semibold"> Log in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Index