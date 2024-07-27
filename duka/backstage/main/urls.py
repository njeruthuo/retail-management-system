from django.urls import path
from .views import CategoryListCreateView, CategoryUpdateDestroy, ProductListCreateView, ProductUpdateDestroy

urlpatterns = [
    # Category
    path('categories/', CategoryListCreateView.as_view(),
         name='category-list-create'),
    path('categories/<int:pk>/', CategoryUpdateDestroy.as_view(),
         name='category-detail'),

    #  Products
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductUpdateDestroy.as_view(), name='product-detail'),
]
