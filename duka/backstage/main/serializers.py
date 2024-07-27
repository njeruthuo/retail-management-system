from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'selling_price', 'buying_price']

    # def create(self, validated_data):
    #     category_name = validated_data.pop('category')
    #     category, created = Category.objects.get_or_create(name=category_name)
    #     product = Product.objects.create(category=category, **validated_data)
    #     return product
