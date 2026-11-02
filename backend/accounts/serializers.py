from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'name', 'email', 'phone_number', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email is already in use."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        name = validated_data.pop('name')
        phone_number = validated_data.pop('phone_number', '')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=name
        )
        UserProfile.objects.create(user=user, phone_number=phone_number)
        return user