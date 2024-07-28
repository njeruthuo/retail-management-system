from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=300)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    selling_price = models.DecimalField(decimal_places=2, max_digits=10)
    buying_price = models.DecimalField(decimal_places=2, max_digits=10)
    category = models.ForeignKey(
        Category, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return self.name


class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(
        decimal_places=2, max_digits=10, default=0)

    def __str__(self) -> str:
        return f"Order {self.id} at {self.created_at}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"{self.product.name} (x{self.quantity})"
