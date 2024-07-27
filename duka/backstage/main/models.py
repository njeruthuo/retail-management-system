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
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return self.name
